class CreatePaperTypes < ActiveRecord::Migration
  def self.up
    create_table :paper_types do |t|
      t.string      :name, :limit => 10
      t.float       :price
      t.integer     :order
      t.timestamps
    end
  end

  def self.down
    drop_table :paper_types
  end
end
