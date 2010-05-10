class Category < ActiveRecord::Base
  has_many :products, :dependent => :nullify
  
  validates_presence_of :name
end
