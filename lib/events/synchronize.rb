class Synchronize
  @queue = :synchronize
  
  class << self
    def perform(id)
      operation = Operation.find_by_id(id, "synchronize")
      post = Post.find_by_id(operation.ref_id)
      Dir.chdir("photos/#{post.folder}")
      dir = Dir.glob("*.jpg")
      dir.each do |filename|
        raw = `exiftool -all:Description -struct -j #{filename}`
        iptc = ActiveSupport::JSON::decode(raw)
        Photo.create(:post_id => post.id, :album_id => post.albums.first.id, :file_name => filename, :file_type => File.extname(iptc[0]['SourceFile']), :caption => "#{iptc[0]['Description']}")
        Rails.logger.info(photo)
      end
      operation.status = 1
      operation.save
      Dir.chdir("../../")
    end
  end
end