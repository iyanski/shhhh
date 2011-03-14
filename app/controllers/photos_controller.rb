class PhotosController < ApplicationController

  def show
    image = Photo.find(params[:id])
    respond_to do |format|
      format.jpg { 
        photo = MiniMagick::Image.open(RAILS_ROOT + "/photos/#{image.post.folder}/thumb1/#{image.file_name}")
        render :text => photo.to_blob, :status => 200, :content_type => "image/jpg" 
      }
    end
  end
end
