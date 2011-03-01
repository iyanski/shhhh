#this seriously needs rewrite

#later rails supports this already but our version does not
class Object
  alias_method :try, :__send__
  
  def tap
    yield self
    self
  end
end

class NilClass
  def try(*args)
    nil
  end
end
#our custom extensions
class Hash
  def deep_delete_if_nil
    delete_if{|k,v| v.nil? }
    each do |k, v| 
      if v.kind_of?(Hash)
        v.deep_delete_if_nil 
      elsif v.respond_to?(:each)
        v.each do |item|
          v.deep_delete_if_nil if v.kind_of?(Hash)
        end
      end
    end
  end
end

module GL

  module Acts
    
    module ExtjsStore

      class FinderProxy
        alias_method :proxy_respond_to?, :respond_to?
        instance_methods.each { |m| undef_method m unless m =~ /(^__|^nil\?$|^send$|proxy_|^object_id$|eval$)/ }
        attr_reader :find_args, :target, :find_options
        
        def initialize(klass)
          @target = klass
        end
        
        def find(*args)
          @find_args = args
          @find_options = @find_args.extract_options!
          @find_options.symbolize_keys!
        end
        
        def find_args
          @find_args.dup
        end
        
        def find_options
          @find_options.dup
        end
        
        def constraint_to_condition(field, condition, value = nil)
          @map ||= {
            :eq => '=',
            :ne => '!=',
            :like => 'like',
            :gt => '>',
            :gte => '>=',
            :lt => '<',
            :lte => '<=',
            :not_null => 'IS NOT NULL',
            :null => 'IS NULL'
          }
          value = [:null, :not_null].include?(condition.to_sym) ? '' : value
          warn "wrong condition #{condition}" unless @map[condition.to_sym]
          "`#{table_name}`.`#{field}` #{@map[condition.to_sym]} #{value}"
        end
        
        def constraints_to_conditions(constraints, separator = 'AND')
          array = []
          constraints.each do |field, hash|
            next if hash.values.first.blank?
            array << constraint_to_condition(field, hash.keys.first, hash.values.first)
          end
          array.join(" #{separator} ")
        end
        
        def constraints_to_conditions_hash(constraints)
          raise "this thing is broken as of now, don't use hash in conditions atm!!"
          hash = {}
          constraints.each do |field, hash|
            next if hash.values.first.blank?
            hash[field.to_sym] = hash.values.first
          end
          hash
        end
        
        def derive_active_record_args_from_find_args
          options = find_options
          options = options.slice(:conditions, :order, :group, :having, :limit, :offset, :joins, :include, :select, :from, :readonly, :lock, :start, :sort, :constraints, :dir)
          #get some of the @target's sort mapping info
          maps = (@target.send(:extjs_store_options)[:sort_maps] || {}).symbolize_keys
          
          limit = options[:limit]
          offset = options.delete(:start) || (!!limit && 0) || nil
          column = options.delete(:sort)
          direction = options.delete(:dir) || (!column.blank? && 'ASC') || nil
          constraints = options.delete(:constraints) || {}
          options[:conditions] ||= ['true']
          
          if options[:conditions].kind_of?(Hash)
            options[:conditions].update(constraints_to_conditions_hash(constraints))
          elsif options[:conditions].kind_of?(Array)
            c = constraints_to_conditions(constraints)
            options[:conditions][0] << " AND #{c}" unless c.blank?
          end
          
          unless column.blank?
            column = maps[column.to_sym] || column
            column = column.split(',').map do |col|
              "`#{(col.strip).split('.').join('`.`')}`"
            end.join(',')
          end
          
          order = column.blank? ? nil : "#{column} #{direction}"
          find_args + [options.update({
            :limit => limit,
            :offset => offset,
            :order => order
          }).deep_delete_if_nil]
        end
        
        def proxy_find
          @target.find(*derive_active_record_args_from_find_args)
        end
        
        def proxy_count
          options = find_options
          options = options.slice(:conditions, :joins, :include, :order, :distinct, :from)
          @target.count(options)
        end
        
        def send(method, *args)
          if proxy_respond_to?(method)
            super
          else
            @target.send(method, *args)
          end
        end
        
        private
          # Forwards any missing method call to the \target.
          def method_missing(method, *args)
            if block_given?
              @target.send(method, *args)  { |*block_args| yield(*block_args) }
            else
              @target.send(method, *args)
            end
          end
      end
      
      def self.included(base)
        base.send(:extend, ClassMethods)
      end
      
      module ClassMethods
        
        # exclude - should be an array of string or symbol that are column names or methods
        # include - should be an array of string or symbol that are column names or methods
        # delegates - shoud be an array mix of hash, that has the form:
        #    [
        #      {:prefix => true, :name => :attribute_or_method_name, :to => :association, :default => '1', :filter => lambda {|a| a.crazy? ? "hell yeah" : "nope"}}, #this will be called thru: model.association.other_value
        #      {:prefix => :my_prefix, :name => :attribute_or_method_name, :to => :association, :default => '1', :filter => lambda {|a| a.crazy? ? "hell yeah" : "nope"}}, #this will be called thru: model.association.other_value
        #      {:attribute_or_method_name => :association }
        #    ]
        # use_meta - true to include the metadata of the records in the store
        # filters - hash proprocessor to attributes or methods:
        #    {
        #     :id => lambda{ |id| Math.square(id) }, #arity 1
        #     :name => :upcase, :user_name => :capitalize,
        #     :other_name => lambda{ |full_name, record| record.name + full_name } #arity 2,
        #    }
        def acts_as_extjs_store(*args)
          send(:extend, GL::Acts::ExtjsStore::SingletonMethods)
          options = args.extract_options!
          options ||= {}
          meta_options = options.delete(:use_meta)
          options = {
            :use_meta => true,
            :include => [], 
            :exclude => [],
            :delegates => [],
            :filters => {}
          }.merge(options).symbolize_keys
          meta_options ||= {}
          
          write_inheritable_attribute :extjs_store_options, options.freeze
          class_inheritable_reader :extjs_store_options
          
          write_inheritable_attribute :extjs_store_meta, store_meta(meta_options)
          class_inheritable_reader :extjs_store_meta

          class_eval do
              attr_accessor :excerpt
          end
        end
      end
      
      module SingletonMethods
        
        def store_column_names(options = {})
          options = extjs_store_options.merge(options)
          exclude = options[:exclude]
          includes = options[:include]
          (includes.empty? ? column_names : includes.map(&:to_s)).uniq - exclude.map(&:to_s)
        end
        
        def store_meta(options = {})
          {
            :totalProperty => :total,
            :idProperty => :id,
            :root => table_name,
            :successProperty => :success
          }.merge(options)
        end
        
        def do_nothing
          lambda {|a| a}
        end
        
        def normalize_delegate(attributes)
          attributes.symbolize_keys!
          if (attributes.keys.size == 1)
            {:prefix => false, 
             :name => attributes.keys.first, 
             :to => attributes.values.first,
             :filter => do_nothing}
          else
            attributes.reverse_merge(
             :prefix => false,
             :filter => do_nothing
            )
          end
        end
        
        def name_for_delegate(record, attributes)
          case attributes[:prefix]
          when true: attributes.values_at(:to, :name).join('_')
          when false,nil: record.respond_to?(attributes[:name]) ? attributes.values_at(:to, :name).join('_') : attributes[:name]
          else
            attributes.values_at(:prefix, :name).join('_')
          end
        end
        
        def value_for_delegate(record, attributes)
          potential = record.send(attributes[:to]).send(:try, attributes[:name])
          potential ||= attributes[:default] if attributes.keys.include?(:default)
          potential = attributes[:filter].call(potential) if attributes[:filter]
          potential
        end
        
        def value_for_column(record, attribute, options)
          potential = record.send(:attributes)[attribute.to_s] || record.send(attribute)
          if(proc = options[:filters][attribute.to_sym])
            proc = proc.to_sym.to_proc unless proc.kind_of?(Proc)
            proc
          end
          
          filter = (proc || do_nothing)
          args = [potential]
          args << record if filter.arity == 2
          filter.call(*args)
        end
        
        #humanizing the field name might not be good
        def field_namer(name, strategy = :humanize)
          {:name => name , :mapping => name}
        end
        
        def adjust_to_active_record_options(store_options, params)
          model = name.constantize
          options = params.dup.symbolize_keys
          params.clear
          
          column = options.delete(:sort)
          direction = options.delete(:dir)
          if store_options[:sort_maps] and !column.blank?
            h = store_options[:sort_maps].symbolize_keys
            i = h.index(column.to_s)
            column = i || column
          end
          
          params.update(:sortInfo => {:field => column, :direction => direction})
          Rails.logger.debug("sort info : %s" % params.inspect )
          params.update(options.except(:conditions, :order, :group, :having, :limit, :offset, :joins, :include, :select, :from, :readonly, :lock, :start, :sort, :constraints, :dir))
          params.deep_delete_if_nil
          params.delete(:sortInfo) if params[:sortInfo].blank?
          params
        end
        
        #options can have:
        #include - columns to include
        #exclude - columns to exclude
        #delegates - same delegate options as acts_as_extjs_store
        #use_meta  - true or false to add metaData to the result
        #meta - override the metadata from acts_as_extjs_store
        #column_preprocessors - override the column_preprocessors from acts_as_extjs_store
        #constraints - dsl for constrainted store load(only applies to actual fields)
          # constraints['name'] = {:like =>  1}
          # constraints['account_id'] = {:eq => 1}
          # valids are: 'eq', 'ne', 'gt', 'gte'
        def store(*args,&proc)
          klass = name.constantize
          options = args.extract_options!
          options = {} unless options.instance_of?(Hash)
          meta_option = options.delete(:meta)

          options = extjs_store_options.deep_merge(options).freeze
          meta = extjs_store_meta.deep_merge(meta_option || {})
          scn = klass.store_column_names(options).freeze
          
          proxy = FinderProxy.new(klass)
          proxy.instance_eval(&proc)
          
          extra_meta = klass.adjust_to_active_record_options(options, proxy.find_options)

          meta = meta.deep_merge(extra_meta)
          
          proxy.proxy_find.instance_eval do
            delegates = options[:delegates].map do |attributes|
              klass.normalize_delegate(attributes)
            end

            array = []
            each_with_index do |record, idx|
              attrib = {}
              scn.each do |method|
                attrib.update(method => klass.value_for_column(record, method, options)) 
              end

              delegates.each do |delegate_attributes|
                attrib.update((name = klass.name_for_delegate(record, delegate_attributes)) => klass.value_for_delegate(record, delegate_attributes)) 
              end
              array << attrib
            end
            
            result = { meta[:root] => array, meta[:totalProperty] => proxy.proxy_count, meta[:successProperty] => true}
            if options[:use_meta]
              n = klass.new
              meta[:fields] = scn.map{|method| klass.field_namer(method)} + delegates.map{|attributes|klass.field_namer(klass.name_for_delegate(n, attributes))}
              meta.symbolize_keys!
              meta.delete(:include)
              result[:metaData] = meta
            end
            result
          end

        end

      end

    end #ExtjsStore

  end #Acts
    
end #GL

ActiveRecord::Base.class_eval do
  include GL::Acts::ExtjsStore
end