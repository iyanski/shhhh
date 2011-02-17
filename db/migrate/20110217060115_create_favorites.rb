class CreateFavorites < ActiveRecord::Migration
  def self.up
    create_table :favorites do |t|
      t.integer     :customer_id, :null => false
      t.integer     :photo_id, :null => false
      t.timestamps
    end
  end

  def self.down
    drop_table :favorites
  end
end
