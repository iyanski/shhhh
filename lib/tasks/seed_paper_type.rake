namespace :seed do
  desc "Fix the boo boo"
  task :paper_types => :environment do
    PaperType.create(:name => "Glossy", :price => 10, :order => 2)
    PaperType.create(:name => "Lustre", :price => 0, :order => 1)
  end
end