class TrackbacksController < ApplicationController
  before_filter :load_entry
  before_filter :login_required, :except => [:create]
  
  # GET /trackbacks
  # GET /trackbacks.xml
  def index
    @trackbacks = @entry.trackbacks.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @trackbacks }
    end
  end

  # GET /trackbacks/1
  # GET /trackbacks/1.xml
  def show
    @trackback = @entry.trackbacks.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @trackback }
    end
  end

  # GET /trackbacks/new
  # GET /trackbacks/new.xml
  def new
    @trackback = @entry.trackbacks.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @trackback }
    end
  end

  # GET /trackbacks/1/edit
  def edit
    @trackback = @entry.trackbacks.find(params[:id])
  end

  # POST /trackbacks.xml
  def create
    @trackback = @entry.trackbacks.new(
                    :title => params[:title],
                    :excerpt => params[:excerpt],
                    :url => params[:url],
                    :blog_name => params[:blog_name])
    if @trackback.save
      render :xml => '<response><error>0</error></response>', :status => :created, :location => @trackback
    else
      render :xml => '<response><error>1</error></response>', :status => :unprocessable_entry
    end
  end

  # PUT /trackbacks/1
  # PUT /trackbacks/1.xml
  def update
    @trackback = @entry.trackbacks.find(params[:id])

    respond_to do |format|
      if @trackback.update_attributes(params[:trackback])
        flash[:notice] = 'Trackback was successfully updated.'
        format.html { redirect_to(@entry) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @trackback.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /trackbacks/1
  # DELETE /trackbacks/1.xml
  def destroy
    @trackback = @entry.trackbacks.find(params[:id])
    @trackback.destroy

    respond_to do |format|
      format.html { redirect_to(@entry) }
      format.xml  { head :ok }
    end
  end
  
  #----------------------------
  # private
  #----------------------------
  private
  
  def load_entry
    @entry = Entry.find(params[:entry_id])
  end
end
