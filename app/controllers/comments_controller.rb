class CommentsController < ApplicationController
  before_filter :load_entry
  before_filter :login_required, :except => [:index, :show, :new, :create]
  
  # GET /comments
  # GET /comments.xml
  def index
    @comments = @entry.comments.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @comments }
    end
  end

  # GET /comments/1
  # GET /comments/1.xml
  def show
    @comment = @entry.comments.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @comment }
    end
  end

  # GET /comments/new
  # GET /comments/new.xml
  def new
    @comment = @entry.comments.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @comment }
    end
  end

  # GET /comments/1/edit
  def edit
    @comment = @entry.comments.find(params[:id])
  end

  # POST /comments
  # POST /comments.xml
  def create
    @comment = @entry.comments.new(params[:comment])

    respond_to do |format|
      if @comment.save
        flash[:notice] = 'Comment was successfully created.'
        format.html { redirect_to(@entry) }
        format.xml  { render :xml => @comment, :status => :created, :location => @comment }
      else
        format.html { render :template => "entries/show" }
        format.xml  { render :xml => @comment.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /comments/1
  # PUT /comments/1.xml
  def update
    @comment = @entry.comments.find(params[:id])

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        flash[:notice] = 'Comment was successfully updated.'
        format.html { redirect_to(@entry) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @comment.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.xml
  def destroy
    @comment = @entry.comments.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to(@entry) }
      format.xml  { head :ok }
    end
  end
  
  ##---------------------------
  ## private
  ##---------------------------
  private
  
  def load_entry
    @entry = Entry.find(params[:entry_id])
  end
end
