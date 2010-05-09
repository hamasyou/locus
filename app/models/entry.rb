class Entry < ActiveRecord::Base
  has_many :comments, :order => "created_at ASC"
  has_many :trackbacks, :order => "created_at ASC"
  
  file_column :image, :magick => { :geometry => "458x360>" }
  validates_presence_of :title, :content
end
