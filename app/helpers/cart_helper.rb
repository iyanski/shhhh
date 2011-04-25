module CartHelper
  def generate_paper_type_combo()
    select = "<select class='paper_type'>"
    select += "<option value=''>Select Price Type</option>"
    PaperType.order('`order` ASC').all.each do |pt|
        select += "<option value=#{pt.id}>#{pt.name}</option>"
    end
    select += "</select>"
  end
  
  def generate_paper_size_combo(id = 'all', selected = '')
    select = "<select class='paper_size' id='paper_size_for_#{id}' item_id=#{id}>"
    select += "<option value=''>Select Price Size</option>"
    PaperSize.order('`order` ASC').all.each do |ps|
        if ps.id == selected
          select += "<option value=#{ps.id} selected='selected'>#{ps.name}</option>"
        else
          select += "<option value=#{ps.id}>#{ps.name}</option>"
        end
    end
    select += "</select>"
  end
end