class CreateAlbums < ActiveRecord::Migration
  def self.up
    create_table :albums do |t|
      t.string      :name,      :limit   => 30, :null => false
      t.integer     :post_id
      t.integer     :order
      t.string      :color,      :limit   => 7, :default => 'red'
      t.integer     :is_featured, :limit => 1
      t.integer     :is_active, :limit => 1
      t.timestamps
    end
  end

  def self.down
    drop_table :albums
  end
end
