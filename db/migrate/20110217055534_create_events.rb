class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.string      :name, :null => false
      t.string      :folder
      t.event_date  :date
      t.integer     :photographer_id
      t.string      :thumbnail
      t.text        :details
      t.boolean     :is_public, :default => 1
      t.boolean     :is_featured, :default => 0
      t.boolean     :is_active, :default => 1
      t.integer     :booking_id
      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end
