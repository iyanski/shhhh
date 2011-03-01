# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110217082750) do

  create_table "albums", :force => true do |t|
    t.string   "name",        :limit => 30,                    :null => false
    t.integer  "event_id"
    t.integer  "order"
    t.string   "color",       :limit => 7,  :default => "red"
    t.integer  "user_id"
    t.boolean  "is_featured"
    t.boolean  "is_active"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "billing_informations", :force => true do |t|
    t.integer  "customer_id"
    t.string   "name"
    t.string   "address_1"
    t.string   "address_2"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bookings", :force => true do |t|
    t.integer  "customer_id"
    t.datetime "start_time"
    t.datetime "stop_time"
    t.text     "event_location_1"
    t.text     "event_location_2"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "contact_name"
    t.string   "contact_phone"
    t.string   "contact_email"
    t.boolean  "for_captioning"
    t.boolean  "for_submissions"
    t.text     "submissions_notes"
    t.boolean  "with_video_services"
    t.boolean  "for_web_submissions"
    t.text     "web_submissions_notes"
    t.boolean  "for_rush_delivery"
    t.string   "billing_firstname"
    t.string   "billing_lastname"
    t.string   "billing_email"
    t.string   "billing_company_name"
    t.text     "billing_address_line_1"
    t.text     "billing_address_line_2"
    t.string   "billing_city"
    t.string   "billing_state"
    t.string   "billing_zip"
    t.string   "contract_signer_name"
    t.string   "contract_signer_address"
    t.string   "contract_signer_email"
    t.boolean  "is_active"
    t.boolean  "is_editable_by_client"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "customers", :force => true do |t|
    t.string   "email",                                 :default => "",   :null => false
    t.string   "encrypted_password",     :limit => 128, :default => "",   :null => false
    t.string   "password_salt",                         :default => "",   :null => false
    t.string   "reset_password_token"
    t.string   "remember_token"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                         :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name",                   :limit => 100,                   :null => false
    t.string   "contact_number"
    t.boolean  "is_active",                             :default => true
    t.integer  "billing_information_id",                                  :null => false
    t.integer  "mailing_information_id",                                  :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "customers", ["email"], :name => "index_customers_on_email", :unique => true
  add_index "customers", ["reset_password_token"], :name => "index_customers_on_reset_password_token", :unique => true

  create_table "events", :force => true do |t|
    t.string   "name",                               :null => false
    t.string   "folder"
    t.date     "event_date"
    t.integer  "photographer_id"
    t.string   "thumbnail"
    t.text     "details"
    t.boolean  "is_public",       :default => true
    t.boolean  "is_featured",     :default => false
    t.boolean  "is_active",       :default => true
    t.integer  "booking_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "favorites", :force => true do |t|
    t.integer  "customer_id", :null => false
    t.integer  "photo_id",    :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "mailing_informations", :force => true do |t|
    t.integer  "customer_id"
    t.string   "name"
    t.string   "address_1"
    t.string   "address_2"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "order_details", :force => true do |t|
    t.integer  "order_id"
    t.integer  "photo_id"
    t.integer  "paper_size_id"
    t.integer  "paper_type_id"
    t.integer  "quantity"
    t.float    "cost"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "orders", :force => true do |t|
    t.integer  "customer_id",        :null => false
    t.integer  "event_id",           :null => false
    t.float    "total"
    t.float    "decimal"
    t.integer  "coupon_id"
    t.string   "ship_to_name"
    t.integer  "shipping_method_id"
    t.string   "remarks"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "paper_sizes", :force => true do |t|
    t.string   "name"
    t.float    "price"
    t.float    "base_price"
    t.integer  "order"
    t.string   "invoicing_code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "paper_types", :force => true do |t|
    t.string   "name",       :limit => 10
    t.float    "price"
    t.integer  "order"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "photos", :force => true do |t|
    t.integer  "event_id"
    t.string   "file_name"
    t.string   "file_type",  :limit => 4
    t.string   "caption"
    t.boolean  "is_active",               :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "shipping_methods", :force => true do |t|
    t.string   "name"
    t.string   "shipping_code"
    t.float    "price"
    t.integer  "order"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                               :default => "", :null => false
    t.string   "encrypted_password",   :limit => 128, :default => "", :null => false
    t.string   "password_salt",                       :default => "", :null => false
    t.string   "reset_password_token"
    t.string   "remember_token"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                       :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "company_name"
    t.string   "contact_number"
    t.integer  "is_active",                           :default => 1
    t.string   "color",                :limit => 7
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
