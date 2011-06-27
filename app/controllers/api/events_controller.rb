class Api::EventsController < ApiController

  def index
    ext Post.store{ find(:all) }
  end
  
  def buckets
    Dir.chdir(photo_path)
    directory = Dir.glob("*")
    Dir.chdir("../")
    items = Array.new
    directory.each do |folders|
      items.push({:name => folders})
    end
    ext ({ :total => 10, 
      :metaData => {
        :fields => [{:name => "name",:mapping => "name"}],
        :totalProperty => "total",
        :successProperty => "success",
        :root => "buckets",
        :idProperty => "id"
      },
      :buckets => items
    }) 
  end
  
  def edit
    id = params[:id]
    post = Post.find_by_id(id)
    respond_to do |format|
      format.json { render :json => post }
    end
  end
  
  def show
    respond_to do |format|
      id = params[:id]
      opts = {}.merge(params.symbolize_keys.slice(:start, :limit, :sort, :dir))
      format.json {
        ext(
          Album.store { 
            find(:all, opts.merge(:conditions => ['post_id = %s' % id]) ) 
          }
        )
      }
    end
  end
  
  def create
    Rails.logger.info(params[:post])
    event = Post.new(params[:post])
    if event.save!
      ext :success => true, :message => "Event Created"
    else
      ext :failed => false, :message => "Event not created"
    end
  end
  
  def update
    post = Post.find_by_id(params[:id])
    if post.update_attributes(params[:post])
      respond_to do |format|
        format.json  { render :json => { :success => true, :message => "Updated successfully" } }
      end
    end
  end
  
  def synchronize
    post = Post.find_by_id(params[:id])
    operation = Operation.new(:ref_id => post.id, :action => "synchronize")
    if operation.save
      Resque.enqueue(Synchronize, operation.id)
    end
    ext :success => true, :message => "Synchronizing #{post.name}"
  end
  
  def watermark
    post = Post.find_by_id(params[:id])
    post.photos.each do |photo|
      operation = Operation.new(:ref_id => photo.id, :action => "watermark")
      if operation.save!
        Resque.enqueue(Watermark, operation.id)
      end
    end
    ext :success => true, :message => "Watermarking #{post.folder}"
  end
  
  def destroy
    post = Post.find(params[:id])
    Rails.logger.info(post.inspect)
    respond_to do |format|
      if post.delete
        format.json {ext :success => true, :message => post.name + " Deleted Successfully"}
      else
        format.json {ext :failure => true, :message => post.errors.full_messages.first}
      end
    end
  end

end