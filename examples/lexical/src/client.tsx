import * as React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import * as Y from "yjs";
import YPartyKitProvider from "y-partykit/provider";

import { createRoot } from "react-dom/client";

declare const PARTYKIT_HOST: string;

function Editor() {
  const initialConfig = {
    editorState: null,
    namespace: "oops",
    nodes: [],
    onError(error: Error) {
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <CollaborationPlugin
        id="yjs"
        // TODO: we should fix it sometime
        // @ts-expect-error TODO: we need to align with lexical's definitions here
        providerFactory={(id, yjsDocMap) => {
          const doc = new Y.Doc();
          yjsDocMap.set(id, doc);

          const provider = new YPartyKitProvider(PARTYKIT_HOST, id, doc);

          return provider;
        }}
        shouldBootstrap={true}
      />
    </LexicalComposer>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<Editor />);
