class CreateBillingInformations < ActiveRecord::Migration
  def self.up
    create_table :billing_informations do |t|
      t.integer       :customer_id
      t.string        :name
      t.string        :address_1
      t.string        :address_2
      t.string        :city
      t.string        :state
      t.string        :zip
      t.timestamps
    end
  end

  def self.down
    drop_table :billing_informations
  end
end
