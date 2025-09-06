import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { MergeView } from '@codemirror/merge';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';

@Component({
  selector: 'app-diff-viewer',
  standalone: true,
  imports: [],
  templateUrl: './diff-viewer.html',
  styleUrl: './diff-viewer.scss'
})
export class DiffViewerComponent implements OnInit {
  @ViewChild('editor', { static: true }) editorRef!: ElementRef;

  private mergeView?: MergeView;

  ngOnInit() {
    this.initializeDiffViewer();
  }

  private initializeDiffViewer() {
    const originalText = `// Original file
function hello() {
  console.log("Hello World!");
  return "original";
}`;

    const modifiedText = `// Modified file
function hello() {
  console.log("Hello Universe!");
  const greeting = "modified";
  return greeting;
}`;

    this.mergeView = new MergeView({
      a: {
        doc: originalText,
        extensions: [javascript()]
      },
      b: {
        doc: modifiedText,
        extensions: [javascript()]
      },
      parent: this.editorRef.nativeElement
    });
  }

  loadFiles(originalContent: string, modifiedContent: string, language?: string) {
    if (this.mergeView) {
      this.mergeView.destroy();
    }

    const getLanguageExtension = (lang?: string) => {
      switch (lang?.toLowerCase()) {
        case 'javascript':
        case 'js':
        case 'ts':
          return [javascript()];
        case 'html':
          return [html()];
        case 'css':
        case 'scss':
          return [css()];
        case 'json':
          return [json()];
        default:
          return [];
      }
    };

    const extensions = getLanguageExtension(language);

    this.mergeView = new MergeView({
      a: {
        doc: originalContent,
        extensions
      },
      b: {
        doc: modifiedContent,
        extensions
      },
      parent: this.editorRef.nativeElement
    });
  }
}
