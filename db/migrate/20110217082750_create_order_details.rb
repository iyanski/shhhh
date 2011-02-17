class CreateOrderDetails < ActiveRecord::Migration
  def self.up
    create_table :order_details do |t|
      t.integer     :order_id
      t.integer     :photo_id
      t.integer     :paper_size_id
      t.integer     :paper_type_id
      t.integer     :quantity
      t.float       :cost
      t.timestamps
    end
  end

  def self.down
    drop_table :order_details
  end
end
