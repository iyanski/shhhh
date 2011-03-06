class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.string      :name
      t.string      :folder
      t.date        :event_date
      t.integer     :photographer_id
      t.string      :thumbnail
      t.text        :details
      t.integer     :is_public, :default => 1, :limit => 1
      t.integer     :is_featured, :default => 0, :limit => 1
      t.integer     :is_active, :default => 1, :limit => 1
      t.integer     :booking_id
      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end
