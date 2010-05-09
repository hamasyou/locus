class CreateComments < ActiveRecord::Migration
  def self.up
    create_table :comments do |t|
      t.string :name
      t.string :email
      t.string :url
      t.text :content
      t.references :entry

      t.timestamps
    end
    
    add_column :entries, :comments_count, :integer, :default => 0
    add_index :comments, :entry_id
  end

  def self.down
    drop_table :comments
    remove_column :entries, :comments_count
    remove_index :comments, :entry_id
  end
end
