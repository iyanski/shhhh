class Api::EventsController < ApiController

  def index
    respond_to do |format|
      format.json  { ext Post.store{ find(:all) } }
    end
  end
  
  def list
    respond_to do |format|
      format.json  { ext Post.store{ find(:all) } }
    end
  end
  
  def buckets
    Dir.chdir("photos")
    directory = Dir.glob("*")
    Dir.chdir("../")
    respond_to do |format|
      items = Array.new
      directory.each do |folders|
        items.push({:name => folders})
      end
      format.json { 
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
      }
    end
  end
  
  def folders
    respond_to do |format|
      
    end
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
    event = Post.new(params[:post])
    if event.save!
      respond_to do |format|
        format.json  { ext :success => true }
      end
    else
      respond_to do |format|
        format.json  { ext :success => false, :message => "Event not created" }
      end
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
    operation.save
    respond_to do |format|
      format.json {ext :success => true, :message => post.name}
    end
  end
  
  def watermark
    post = Post.find_by_id(params[:id])
    
    post.photos.each do |photo|
      operation = Operation.new
      operation.ref_id = photo.id
      operation.action = "watermark"
      if operation.save!
        Resque.enqueue(Watermark, operation.id)
      end
    end
    
    respond_to do |format|
      format.json {ext :success => true, :message => post.folder}
    end
  end

end