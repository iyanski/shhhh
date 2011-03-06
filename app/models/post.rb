class Post < ActiveRecord::Base
  has_many    :albums
  has_many    :photos
  belongs_to  :booking
  belongs_to  :user
  
  after_create  :create_default_album

  acts_as_extjs_store(
    :include => self.column_names,
    :filters => {
      :is_active => lambda{|bool| bool == 1 ? "Yes" : "No"},
      :created_at => lambda{|at| at.to_s(:timezone) },
      :updated_at => lambda{|at| at.to_s(:timezone) },
    }
  )
  
  private
  
  def create_default_album
    album = Album.new({:post_id => self.id, :name => "Extras", :color => "red", :order => 1, :is_active => 1})
    album.save
  end
  
  def delete_albums
    self.albums.clear
  end
  
  def delete_photos
    self.photos.clear
  end
end
