class CreateTrackbacks < ActiveRecord::Migration
  def self.up
    create_table :trackbacks do |t|
      t.string :title
      t.text :excerpt
      t.string :url
      t.string :blog_name
      t.references :entry

      t.timestamps
    end
    
    add_column :entries, :trackbacks_count, :integer, :default => 0
    add_index :trackbacks, :entry_id
  end

  def self.down
    drop_table :trackbacks
    remove_column :entries, :trackbacks_count
    remove_index :trackbacks, :entry_id
  end
end
