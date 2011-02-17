class CreateBookings < ActiveRecord::Migration
  def self.up
    create_table :bookings do |t|
      t.integer   :customer_id                
      t.datetime  :start_time             
      t.datetime  :stop_time              
      t.text      :event_location_1       
      t.text      :event_location_2       
      t.string    :city                   
      t.string    :state                  
      t.string    :zip                    
      t.string    :contact_name           
      t.string    :contact_phone          
      t.string    :contact_email          
      t.boolean   :for_captioning               
      t.boolean   :for_submissions            
      t.text      :submissions_notes      
      t.boolean   :with_video_services         
      t.boolean   :for_web_submissions        
      t.text      :web_submissions_notes  
      t.boolean   :for_rush_delivery  
      t.string    :billing_firstname      
      t.string    :billing_lastname       
      t.string    :billing_email          
      t.string    :billing_company_name   
      t.text      :billing_address_line_1 
      t.text      :billing_address_line_2 
      t.string    :billing_city           
      t.string    :billing_state          
      t.string    :billing_zip            
      t.string    :contract_signer_name   
      t.string    :contract_signer_address
      t.string    :contract_signer_email  
      t.boolean   :is_active          
      t.boolean   :is_editable_by_client
      t.timestamps
    end
  end

  def self.down
    drop_table :bookings
  end
end
