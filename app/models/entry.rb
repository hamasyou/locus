class Entry < ActiveRecord::Base
  file_column :image, :magick => { :geometry => "458x360>" }
  validates_presence_of :title, :content
end
