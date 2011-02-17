class Order < ActiveRecord::Base
  has_one :mailing_information
  has_one :billing_information
  has_many :order_details
end