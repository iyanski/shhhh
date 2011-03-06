class Api::EventsController < ApiController
  
  def list
    respond_to do |format|
      format.json  { ext Post.store{ find(:all) } }
      format.html  { ext Post.store{ find(:all) } }
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
  
  def show
    event = Post.find_by_id(params[:id])
    respond_to do |format|
      unless event.nil? 
        format.json  { ext :data => event }
      else
        format.json  { ext :success => false }
      end
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
    if operation.save!
      Resque.enqueue(Synchronize, operation.id)
    end
    respond_to do |format|
      format.json {ext :success => true, :message => post.name}
    end
  end
  
  def watermark
    post = Post.find_by_id(params[:id])
    operation = Operation.new
    operation.ref_id = params[:id]
    operation.action = "watermark"
    respond_to do |format|
      format.json {ext :success => true, :message => post.folder}
    end
  end

end