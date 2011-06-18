class EventsController < ApplicationController
  def index
    @page_title = "Events"
    @events = Post.all.paginate(:page => params[:page], :per_page => 3)
    Rails.logger.info(@events.inspect)
  end
  
  def show
    post = Post.find_by_id(1)
    @page_title = post.name
    @albums = post.albums.paginate(:page => params[:page], :per_page => 20)
  end
  
end
