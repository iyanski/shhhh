class EventsController < ApplicationController
  def index
    @page_title = "Events"
    @events = Event.find_all_by_is_active(1).paginate(:page => params[:page], :per_page => 10)
  end
end
