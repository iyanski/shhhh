class CreateCartItems < ActiveRecord::Migration
  def self.up
    create_table :cart_items do |t|
      t.integer     :photo_id
      t.integer     :cart_id
      t.integer     :paper_size_id, :default => 1
      t.integer     :paper_type_id, :default => 1
      t.float       :price
      t.integer     :amount
      t.integer      :quantity, :default => 1
      t.timestamps
    end
    add_index :cart_items, :paper_size_id
    add_index :cart_items, :paper_type_id
  end

  def self.down
    drop_table :cart_items
  end
end
