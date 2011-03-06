class CreateOperations < ActiveRecord::Migration
  def self.up
    create_table :operations do |t|
      t.integer       :ref_id
      t.string        :action
      t.integer       :status,  :default => 0
      t.datetime      :finished_on
      t.timestamps
    end
  end

  def self.down
    drop_table :operations
  end
end
