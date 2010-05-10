class Product < ActiveRecord::Base
  belongs_to :category
  
  file_column :image, :magick => { :size => '640>', :versions => { :small => '170x170>', :middle => '320>' }, :image_required => true }
  file_column :cover_image, :magick => { :size => '758>', :image_required => true }
  
  validates_presence_of :title, :code, :price, :description, :image
  validates_numericality_of :price
  validates_uniqueness_of :code
end
