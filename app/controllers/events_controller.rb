class EventsController < ApplicationController
  def index
    @page_title = "Events"
    @events = Post.all.paginate(:page => params[:page], :per_page => 20)
    Rails.logger.info(@events.inspect)
  end
  
  def show
    @post = Post.find(params[:id])
    @albums = @post.albums
    Rails.logger.info(@albums.first.post.name)
    #@page_title = @albums.post.name
  end
  
end
