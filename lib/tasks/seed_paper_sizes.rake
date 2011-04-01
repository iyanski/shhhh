namespace :seed do
  desc "Fix the boo boo"
  task :paper_sizes => :environment do
    PaperSize.create(:name => "4 x 6", :price => 6.99, :base_price => 0.29, :order => 1, :invoicing_code => "E46")
    PaperSize.create(:name => "5 x 7", :price => 7.99, :base_price => 1.15, :order => 2, :invoicing_code => "E57")
    PaperSize.create(:name => "8 x 10", :price => 13.99, :base_price => 1.79, :order => 3, :invoicing_code => "E810")
    PaperSize.create(:name => "8 x 12", :price => 15.99, :base_price => 2.25, :order => 4, :invoicing_code => "E812")
    PaperSize.create(:name => "12 x 18", :price => 34.99, :base_price => 10, :order => 5, :invoicing_code => "E1218")
    PaperSize.create(:name => "20 x 30", :price => 59.99, :base_price => 24.95, :order => 6, :invoicing_code => "E2030")
    PaperSize.create(:name => "8 Wallets", :price => 9.99, :base_price => 1.99, :order => 7, :invoicing_code => "E8W")
    PaperSize.create(:name => "Button", :price => 9.99, :base_price => 3.5, :order => 8, :invoicing_code => "BUTTON")
    PaperSize.create(:name => "500 x 500 FREE Watermarked Version (Download)", :price => 0, :base_price => 0, :order => 9, :invoicing_code => "D500500")
    PaperSize.create(:name => "600 x 800 (72dpi) Non-Watermarked Version (Download)", :price => 4.99, :base_price => 10, :order => 1, :invoicing_code => "D4x")
    PaperSize.create(:name => "8 x 12 (300dpi) Full Resolution (Download)", :price => 75, :base_price => 0, :order => 11, :invoicing_code => "D812")
  end
end