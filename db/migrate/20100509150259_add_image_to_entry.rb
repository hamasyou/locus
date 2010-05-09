class AddImageToEntry < ActiveRecord::Migration
  def self.up
    add_column :entries, :image, :string
  end

  def self.down
    remove_column :entries, :image
  end
end
