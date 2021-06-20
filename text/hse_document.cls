% Шаблон для оформления работ в ВШЭ
% Используется xelatex
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{hse_document}[2020/10/03]

\LoadClass[a4paper,10pt]{article}


% \documentclass[a4paper,10pt]{article}

%%% Работа с русским языком
\usepackage[utf8]{inputenc}		% кодировка исходного текста
\usepackage[T2A]{fontenc}			% кодировка
\usepackage{cmap}					% поиск в PDF
\usepackage{mathtext} 				% русские буквы в формулах
\usepackage[english,russian]{babel}	% локализация и переносы

%%% Дополнительная работа с математикой
\usepackage{amsmath,amsfonts,amssymb,amsthm,mathtools} % AMS
\usepackage{icomma} % "Умная" запятая: $0,2$ --- число, $0, 2$ --- перечисление

%%% Библиографический список
% \bibliographystyle{gost-numeric.bbx}
% \usepackage[parentracker=true,
% backend=biber,
% hyperref=false,
% bibencoding=utf8,
% style=numeric-comp,
% language=auto,
% autolang=other,
% citestyle=gost-numeric,
% defernumbers=true,
% bibstyle=gost-numeric,
% sorting=ntvy,
% ]{biblatex}
% \addbibresource{./library.bib}

%%% Рисунки
\usepackage[format=plain,
            font={small,it,bf},
            figurename=Рисунок,
            figurewithin=section,
            tableposition=bottom,
            labelsep=endash % Разделитель между числом и подписью (--)
            ]{caption}
\captionsetup[table]{singlelinecheck=false,justification=raggedleft}


%%% Заголовки
\usepackage{titlesec}
\renewcommand{\numberline}[1]{#1~}
\titleformat{\section}[block]{\fontsize{16}{12}\selectfont\bfseries\filcenter}{Глава \thesection}{6pt}{}
\titleformat{\subsection}[block]{\fontsize{14}{12}\bfseries}{\thesubsection}{6pt}{}
\titleformat{\subsubsection}[block]{\fontsize{13}{12}\bfseries}{\thesubsubsection}{6pt}{}

\titlespacing*{\section}
{0pt}{0pt}{12pt} % left, top, bottom
\newcommand{\sectionbreak}{\clearpage}

\titlespacing*{\subsection}
{0pt}{12pt}{6pt}

\titlespacing*{\subsubsection}
{0pt}{8pt}{4pt}

%%% Оглавление
\usepackage{tocloft}
\renewcommand{\cftsecleader}{\cftdotfill{\cftdotsep}} % точки в оглавлении
\renewcommand\cfttoctitlefont{\hfill\Large\bfseries} % заголовок оглавления по центру
\renewcommand\cftaftertoctitle{\hfill\mbox{}} % продолжение заголовок по центру


%%% Работа с картинками
\usepackage{graphicx}  % Для вставки рисунков
\graphicspath{{diagrams/}{images/}{images2/}}  % папки с картинками
\setlength\fboxsep{3pt} % Отступ рамки \fbox{} от рисунка
\setlength\fboxrule{1pt} % Толщина линий рамки \fbox{}
\usepackage{wrapfig} % Обтекание рисунков текстом

%%% Работа с таблицами
\usepackage{array,tabularx,tabulary,booktabs} % Дополнительная работа с таблицами
\usepackage{longtable}  % Длинные таблицы
\usepackage{multirow} % Слияние строк в таблице

% Нумерация таблиц внутри глав
\makeatletter
\renewcommand{\thetable}{\thesection.\@arabic\c@table}
\@addtoreset{table}{section}
\makeatother

\newtheorem*{nonum}{Решение}

%%% Страница
\usepackage[fontsize=13pt]{scrextend}
\usepackage{geometry} % Простой способ задавать поля
	\geometry{top=20mm}
	\geometry{bottom=20mm}
	\geometry{left=30mm}
	\geometry{right=15mm}

\usepackage{setspace} % Интерлиньяж 1.5
    \onehalfspacing

\usepackage{paralist} % междустрочные отступы в списках
\setdefaultleftmargin{2cm}{}{}{}{.5em}{.5em}

\usepackage{indentfirst} % Абзацные отступы
    \setlength{\parindent}{1.25cm}


\usepackage[normalem]{ulem} % для подчёркиваний uline
    \ULdepth = 0.2em % расстояние от линии до текста выше/ниже


\usepackage{fontspec}
    \setmainfont{Times New Roman}


\newcommand{\maketoc}[4][преподаватель \\
кафедры информационных\\
технологий в бизнесе]{%
    \thispagestyle{empty}
    \begin{center}
        \begingroup
        \fontsize{13pt}{15pt}\selectfont

        Пермский филиал федерального государственного автономного \\
        образовательного учреждения высшего образования \\
        <<Национальный исследовательский университет \\
        <<Высшая школа экономики>>

        \vspace{2em}
        \textit{Факультет экономики, менеджмента и бизнес-информатики}

        \vspace{4em}
        Бочкарев Вадим Александрович

        \vspace{3em}
        \textbf{#2}

        \vspace{0.5em}
        \textit{#3}

        \vspace{3em}

    \fontsize{13pt}{15pt}\selectfont
        студента образовательной программы бакалавриата <<Программная инженерия>>\\
        по направлению подготовки \textit{\uline{09.03.04 Программная инженерия}}

    \vfill

    \hfill % заполнить пустоту по ширине
    \parbox{6cm}{

        \fontsize{13pt}{15pt}\selectfont
        \begin{flushleft}
                Руководитель\\
                {#1}

                \hrulefill

                {#4}
        \end{flushleft}
    }

    \vfill

    \endgroup
    \center{Пермь, 2021}\end{center}\newpage

\clearpage
}
