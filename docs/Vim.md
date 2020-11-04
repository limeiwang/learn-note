# Vim

玩一下vim

## vimrc
``` vim
syntax on
set number
set norelativenumber
set cursorline
set showcmd
set wildmenu
set hlsearch
exec "nohlsearch"
set incsearch
set ignorecase
set smartcase

noremap = nzz
noremap - Nzz

noremap K 5k
noremap J 5j

map s <nop>
map S :w<CR>
map Q :q<CR>
map R :source $MYVIMRC<CR>

```