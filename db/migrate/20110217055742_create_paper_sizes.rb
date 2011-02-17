class CreatePaperSizes < ActiveRecord::Migration
  def self.up
    create_table :paper_sizes do |t|
      t.string      :name
      t.float       :price
      t.float       :base_price
      t.integer     :order
      t.string      :invoicing_code
      t.timestamps
    end
  end

  def self.down
    drop_table :paper_sizes
  end
end
