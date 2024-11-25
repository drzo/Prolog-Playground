import React from 'react';

const UserGuide: React.FC = () => {
  return (
    <div className="prose prose-slate max-w-none">
      <h1>Cognitive Prolog Playground Guide</h1>
      
      <h2>Features</h2>
      <ul>
        <li><strong>Neural-Symbolic Integration</strong> - Combines Prolog's logical reasoning with neural networks</li>
        <li><strong>Echo State Networks (ESN)</strong> - Provides temporal pattern recognition and optimization</li>
        <li><strong>Query Optimization</strong> - Automatically improves query performance using learned patterns</li>
        <li><strong>Real-time Feedback</strong> - Instant results with detailed execution metrics</li>
      </ul>

      <h2>Getting Started</h2>
      <h3>Basic Query Structure</h3>
      <pre className="bg-gray-50 p-4 rounded-lg">
        {`% Define relationships
parent(john, mary).
parent(mary, ann).

% Query all grandparents
grandparent(X, Y) :- parent(X, Z), parent(Z, Y).`}
      </pre>

      <h3>Quick Start Examples</h3>
      <ul>
        <li><code>parent(john, X).</code> - Find all children of John</li>
        <li><code>grandparent(X, Y).</code> - Find all grandparent relationships</li>
        <li><code>parent(X, ann).</code> - Find Ann's parents</li>
      </ul>

      <h2>Advanced Features</h2>
      <h3>Pattern Learning</h3>
      <p>The system learns from your queries to optimize similar future queries. Common patterns are:</p>
      <ul>
        <li>Ancestor queries</li>
        <li>Relationship chains</li>
        <li>Complex logical conditions</li>
      </ul>

      <h3>Query Optimization</h3>
      <p>Queries are automatically optimized using:</p>
      <ul>
        <li>Historical pattern matching</li>
        <li>ESN-based prediction</li>
        <li>Neural-symbolic integration</li>
      </ul>

      <h2>Keyboard Shortcuts</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Shortcut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><kbd>Ctrl</kbd> + <kbd>Enter</kbd></td>
            <td>Run Query</td>
          </tr>
          <tr>
            <td><kbd>Ctrl</kbd> + <kbd>L</kbd></td>
            <td>Clear Console</td>
          </tr>
          <tr>
            <td><kbd>Ctrl</kbd> + <kbd>Z</kbd></td>
            <td>Undo</td>
          </tr>
        </tbody>
      </table>

      <h2>Best Practices</h2>
      <ol>
        <li><strong>Query Structure</strong>
          <ul>
            <li>Keep queries focused and specific</li>
            <li>Use meaningful variable names</li>
            <li>Break complex queries into smaller parts</li>
          </ul>
        </li>
        <li><strong>Performance</strong>
          <ul>
            <li>Leverage pattern learning for similar queries</li>
            <li>Use indexed predicates when possible</li>
            <li>Monitor execution metrics</li>
          </ul>
        </li>
      </ol>

      <h2>Troubleshooting</h2>
      <h3>Common Issues</h3>
      <dl>
        <dt>Query times out</dt>
        <dd>Break down complex queries into simpler parts</dd>
        
        <dt>Unexpected results</dt>
        <dd>Check variable naming and rule ordering</dd>
        
        <dt>Performance issues</dt>
        <dd>Enable query optimization and review execution metrics</dd>
      </dl>

      <h2>Integration</h2>
      <p>The Cognitive Prolog Playground can be integrated with:</p>
      <ul>
        <li>External knowledge bases</li>
        <li>Custom neural networks</li>
        <li>Third-party Prolog systems</li>
      </ul>

      <h2>FAQ</h2>
      <details className="mb-4">
        <summary className="font-semibold">How does query optimization work?</summary>
        <p>The system uses Echo State Networks to learn patterns from successful queries and applies this knowledge to optimize similar future queries.</p>
      </details>

      <details className="mb-4">
        <summary className="font-semibold">Can I use custom predicates?</summary>
        <p>Yes, you can define custom predicates and rules in the program editor. The system will automatically incorporate them into its optimization process.</p>
      </details>

      <details className="mb-4">
        <summary className="font-semibold">What are execution metrics?</summary>
        <p>Metrics include query execution time, optimization time, and pattern matching success rate. These help you understand and improve query performance.</p>
      </details>
    </div>
  );
};

export default UserGuide;