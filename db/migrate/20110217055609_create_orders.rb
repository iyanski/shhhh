class CreateOrders < ActiveRecord::Migration
  def self.up
    create_table :orders do |t|
      t.integer         :customer_id, :null => false
      t.integer         :event_id, :null => false
      t.float           :total,   :decimal, :precision => 8, :scale => 2
      t.integer         :coupon_id
      t.string          :ship_to_name
      t.integer         :shipping_method_id
      t.string          :remarks
      t.timestamps
    end
  end

  def self.down
    drop_table :orders
  end
end
