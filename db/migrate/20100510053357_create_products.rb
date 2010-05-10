class CreateProducts < ActiveRecord::Migration
  def self.up
    create_table :products do |t|
      t.string  :title, :code, :image, :cover_image
      t.integer :price
      t.text    :description
      t.timestamps
    end
  end

  def self.down
    drop_table :products
  end
end
