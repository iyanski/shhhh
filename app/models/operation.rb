class Operation < ActiveRecord::Base
  after_save :create_synch_operation
  
  def create_synch_operation
    Resque.enqueue(Synchronize, self.id)
  end
end
