module CartHelper
  def generate_paper_type_combo
    select = "<select class='paper_type'>"
    PaperType.all.each do |pt|
        select += "<option value=#{pt.id}>#{pt.name}</option>"
    end
    select += "</select>"
  end
  
  def generate_paper_size_combo(id = 'all')
    select = "<select class='paper_size' id='paper_size_for_#{id}' item_id=#{id}>"
    PaperSize.all.each do |ps|
        select += "<option value=#{ps.id}>#{ps.name}</option>"
    end
    select += "</select>"
  end
  
  def default_paper_size_price
    PaperSize.first.price
  end
end