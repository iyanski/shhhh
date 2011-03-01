class CreateAlbums < ActiveRecord::Migration
  def self.up
    create_table :albums do |t|
      t.string      :name,      :limit   => 30, :null => false
      t.integer     :event_id
      t.integer     :order
      t.string      :color,      :limit   => 7, :default => 'red'
      t.integer     :user_id
      t.boolean     :is_featured
      t.boolean     :is_active
      t.timestamps
    end
  end

  def self.down
    drop_table :albums
  end
end
