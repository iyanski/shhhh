class PhotosController < ApplicationController

  def show
    @image = Photo.find(params[:id])
    @page_title = @image.file_name
    respond_to do |format|
      format.jpg { 
        photo = MiniMagick::Image.open(RAILS_ROOT + "/photos/#{@image.post.folder}/thumb3/#{@image.file_name}")
        render :text => photo.to_blob, :status => 200, :content_type => "image/jpg" 
      }
      format.html {
        
      }
    end
  end
  
  def thumb0
    render_thumb(params[:id], "thumb0")
  end
  
  def thumb1
    render_thumb(params[:id], "thumb1")
  end
  
  def thumb2
    render_thumb(params[:id], "thumb2")
  end
  
  private
  def render_thumb(id, thumb)
    @image = Photo.find(id)
    @page_title = @image.file_name
    respond_to do |format|
      format.jpeg { 
        photo = MiniMagick::Image.open(RAILS_ROOT + "/photos/#{@image.post.folder}/#{thumb}/#{@image.file_name}")
        render :text => photo.to_blob, :status => 200, :content_type => "image/jpg" 
      }
      format.jpg { 
        photo = MiniMagick::Image.open(RAILS_ROOT + "/photos/#{@image.post.folder}/#{thumb}/#{@image.file_name}")
        render :text => photo.to_blob, :status => 200, :content_type => "image/jpg" 
      }
    end
  end
end
