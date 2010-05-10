class EntriesController < ApplicationController
  before_filter :login_required, :except => [:index, :show]
  before_filter :load_sidebar
  
  # GET /entries
  # GET /entries.xml
  def index
    conditions = { :order => "entries.created_at DESC", :include => :tags }
    conditions.update(Entry.find_options_for_find_tagged_with(params[:tag])) if params[:tag]
    
    @entries = Entry.find(:all, conditions)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @entries }
      format.atom
    end
  end

  # GET /entries/1
  # GET /entries/1.xml
  def show
    @entry = Entry.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @entry }
    end
  end

  # GET /entries/new
  # GET /entries/new.xml
  def new
    @entry = Entry.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @entry }
    end
  end

  # GET /entries/1/edit
  def edit
    @entry = Entry.find(params[:id])
  end

  # POST /entries
  # POST /entries.xml
  def create
    @entry = Entry.new(params[:entry])

    respond_to do |format|
      if @entry.save
        flash[:notice] = 'Entry was successfully created.'
        format.html { redirect_to(@entry) }
        format.xml  { render :xml => @entry, :status => :created, :location => @entry }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @entry.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /entries/1
  # PUT /entries/1.xml
  def update
    @entry = Entry.find(params[:id])

    respond_to do |format|
      if @entry.update_attributes(params[:entry])
        flash[:notice] = 'Entry was successfully updated.'
        format.html { redirect_to(@entry) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @entry.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /entries/1
  # DELETE /entries/1.xml
  def destroy
    @entry = Entry.find(params[:id])
    @entry.destroy

    respond_to do |format|
      format.html { redirect_to(entries_url) }
      format.xml  { head :ok }
    end
  end
  
  #----------------------------
  # private
  #----------------------------
  private 
  
  def load_sidebar
    @tags = Entry.tag_counts
    @side_entries = Entry.find(:all, :limit => 5, :order => "created_at DESC")
    @side_comments = Comment.find(:all, :limit => 5, :order => "comments.created_at DESC", :include => :entry)
    @side_trackbacks = Trackback.find(:all, :limit => 5, :order => "trackbacks.created_at DESC", :include => :entry)
  end
end
