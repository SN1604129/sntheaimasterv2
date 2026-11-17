"""Generate the supplied-facts resume. Optional maintenance dependency: reportlab."""
import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'content/resume.json').read_text())
target = ROOT / 'public/Sudipta-Nath-Resume.pdf'
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='ResumeBody', fontName='Helvetica', fontSize=9, leading=12, textColor=colors.HexColor('#28372f'), spaceAfter=5))
styles.add(ParagraphStyle(name='ResumeSection', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=colors.HexColor('#245b40'), spaceBefore=10, spaceAfter=7))
styles.add(ParagraphStyle(name='ResumeName', fontName='Helvetica-Bold', fontSize=26, leading=29, textColor=colors.HexColor('#14251c'), spaceAfter=6))
styles.add(ParagraphStyle(name='ResumeTitle', fontName='Helvetica', fontSize=11, leading=15, textColor=colors.HexColor('#245b40'), spaceAfter=7))
styles.add(ParagraphStyle(name='ResumeSmall', fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#4d5b51'), spaceAfter=8))

def text(value):
    return escape(value.replace('’', "'").replace('–', '-').replace('—', '-').replace('→', '>'))

def p(value, style='ResumeBody'):
    return Paragraph(value, styles[style])

story = [p(text(data['name']), 'ResumeName'), p(f"{text(data['title'])} | {text(data['location'])}", 'ResumeTitle')]
story.append(p(f'<link href="mailto:{data["email"]}">{data["email"]}</link> | <link href="{data["github"]}">github.com/SN1604129</link> | <link href="{data["website"]}">sntheaimaster.com</link>', 'ResumeSmall'))
story.append(p(text(data['summary'])))
story.append(p('EXPERIENCE', 'ResumeSection'))
for job in data['experience']:
    story.append(p(f'<b>{text(job["role"])} - {text(job["organisation"])}</b> | {text(job["date"])}'))
    for bullet in job['bullets']:
        story.append(p(f'&#8226; {text(bullet)}'))
story.append(p('SELECTED PROJECTS', 'ResumeSection'))
for project in data['projects']:
    title = text(project['name'])
    if project.get('link'):
        title = f'<link href="{project["link"]}">{title}</link>'
    story.append(p(f'<b>{title}.</b> {text(project["detail"])}'))
story.append(p('RESEARCH & PUBLICATIONS', 'ResumeSection'))
for item in data['research'] + data['publications']:
    story.append(p(text(item)))
story.append(p('EDUCATION', 'ResumeSection'))
for item in data['education']:
    story.append(p(f'<b>{text(item["degree"])}</b><br/>{text(item["institution"])} | {text(item["date"])}'))
story.append(p('TECHNICAL SKILLS', 'ResumeSection'))
story.append(p(text(' | '.join(data['skills']))))

doc = SimpleDocTemplate(str(target), pagesize=(210*mm, 297*mm), leftMargin=18*mm, rightMargin=18*mm, topMargin=15*mm, bottomMargin=15*mm, title='Sudipta Nath - AI Engineer Resume', author=data['name'])
doc.build(story)
print(f'Generated {target.relative_to(ROOT)}')
