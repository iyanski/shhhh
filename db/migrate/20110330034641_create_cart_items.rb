class CreateCartItems < ActiveRecord::Migration
  def self.up
    create_table :cart_items do |t|
      t.integer     :photo_id
      t.integer     :cart_id
      t.integer     :paper_size_id
      t.integer     :paper_type_id
      t.float       :price
      t.integer     :amount
      t.timestamps
    end
  end

  def self.down
    drop_table :cart_items
  end
end
