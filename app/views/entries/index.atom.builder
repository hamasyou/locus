atom_feed do |feed|
  feed.title "Locus"
  feed.updated @entries.first.created_at
  
  @entries.each do |entry|
    feed.entry(entry) do |item|
      item.title entry.title
      item.content entry.content, :type => "html"
      
      item.author do |author|
        author.name("hamasyou")
      end
    end
  end
end
