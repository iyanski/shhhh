class CreatePhotos < ActiveRecord::Migration
  def self.up
    create_table :photos do |t|
      t.integer         :event_id
      t.string          :file_name
      t.string          :file_type,   :limit   => 4
      t.string          :caption
      t.integer         :is_active,   :default => 1, :limit   => 1
      t.timestamps
    end
  end

  def self.down
    drop_table :photos
  end
end
