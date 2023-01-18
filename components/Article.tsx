import React from 'react'
import {classNames} from '#/lib/classNames'

export interface ArticleProps
  extends React.ComponentPropsWithoutRef<'article'> {}

export const Article = React.forwardRef(function Article(
  {children, ...restProps}: ArticleProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <article
      ref={forwardedRef}
      className={classNames('prose p-2', classNames)}
      {...restProps}
    >
      {children}
    </article>
  )
})
