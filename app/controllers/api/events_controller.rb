class Api::EventsController < ApiController
  
  def list
    respond_to do |format|
      format.json  { ext Event.store{ find(:all) } }
      format.html  { ext Event.store{ find(:all) } }
    end
  end
  
  def buckets
    respond_to do |format|
      items = Array.new
      (0...10).each do |item|
        items.push(:id => item, :name => "name of the event folder #{item}")
      end
      format.json { 
        ext ({ :total => 10, 
          :metaData => {
            :fields => [{:name => "id",:mapping => "id"}, {:name => "name",:mapping => "name"}],
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
  
  def show
    event = Event.find_by_id(params[:id])
    respond_to do |format|
      unless event.nil? 
        format.json  { ext :data => event }
      else
        format.json  { ext :success => false }
      end
    end
  end
  
end