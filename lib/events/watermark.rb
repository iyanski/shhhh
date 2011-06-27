class Watermark
  @queue = :watermarks
  
  class << self
    def perform(id)
      operation = Operation.find_by_id(id, "watermark")
      photo = Photo.find_by_id(operation.ref_id)
      process(photo.post.folder, photo.file_name, "thumb0")
      process(photo.post.folder, photo.file_name, "thumb1")
      process(photo.post.folder, photo.file_name, "thumb2")
      process(photo.post.folder, photo.file_name, "thumb3")
      operation.status = 1
      operation.save
    end
    
    def process(directory, file, thumb)
      widths = {:thumb0 => 50, :thumb1 => 120, :thumb2 => 300, :thumb3 => 600}
      photo = MiniMagick::Image.open("photos/#{directory}/#{file}")
      label = MiniMagick::Image.open("public/images/watermarks/label.png")
      logo = MiniMagick::Image.open("public/images/watermarks/logo.png")
      
      if thumb == "thumb2" || thumb == "thumb3"
        height = photo[:height] / (photo[:width] / 600)
        photo.resize "600x#{height}"
        output = photo.composite(logo) do |c|
        	c.gravity "southeast"
        end
        output = output.composite(label) do |c|
        	c.gravity "center"
        end
        height = photo[:height] / (photo[:width] / widths[thumb.to_sym])
        output.resize "#{widths[thumb.to_sym]}x#{height}"
        
      elsif (thumb == "thumb1")
        
        height = photo[:height] / (photo[:width] / widths[thumb.to_sym])
        
        if(widths[thumb.to_sym] > height)
          photo.resize "#{widths[thumb.to_sym]}x#{height}"
        else
          photo.resize "90x134"
        end
        output = photo
        
      else
        height = photo[:height] / (photo[:width] / widths[thumb.to_sym])
        photo.resize "#{widths[thumb.to_sym]}x#{height}"
        output = photo
      end
      
      Dir.mkdir("photos/#{directory}/#{thumb}") unless File.exists?("photos/#{directory}/#{thumb}")
      output.write("photos/#{directory}/#{thumb}/#{file}")
    end
  end
end