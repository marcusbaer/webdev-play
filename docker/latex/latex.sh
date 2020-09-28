docker run --rm -it -v $(pwd):/home danteev/texlive latexmk -pdf $1.tex

rm $1.aux
rm $1.fdb_latexmk
rm $1.fls
rm $1.log
rm $1.out
